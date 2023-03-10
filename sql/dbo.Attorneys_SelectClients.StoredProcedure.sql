CREATE proc [dbo].[Attorneys_SelectClients]


AS

/*----- TEST CODE -----

EXECUTE dbo.Attorneys_SelectClients

*/

BEGIN

	SELECT  ap.Id
		   ,ap.PracticeName
		   ,l.Id
		   ,lt.Id
		   ,lt.[Name]
		   ,l.LineOne
		   ,l.LineTwo
		   ,l.City
		   ,l.Zip
		   ,l.StateId
		   ,s.Name
		   ,l.Latitude
		   ,l.Longitude
		   ,l.DateCreated
		   ,l.DateModified
		   ,l.CreatedBy
		   ,l.ModifiedBy
		   ,ap.Bio
		   ,ap.Phone
		   ,ap.Email
		   ,ap.Website
		   ,Languages = (
						  SELECT la.Id
								 ,la.Code
								 ,la.Name
						  FROM dbo.AttorneyLanguages as al 
							   inner join dbo.Languages as la
								  on al.LanguageId = la.Id
						  WHERE al.AttorneyProfileId = ap.Id
						  FOR JSON AUTO
						)			
			,ap.DateCreated
			,ap.DateModified
			,Clients =
				(
				SELECT c.Id							   
					,c.FirstName
					,c.LastName
					,c.Mi as MiddleInitial
					,JSON_QUERY((SELECT Id
										,[Name]
								FROM dbo.GenderTypes		
								WHERE Id = c.GenderTypeId
								FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS [GenderType]					
					,c.Email
					,c.Landline
					,c.Mobile
					,JSON_QUERY((SELECT	cl.Id
								,JSON_QUERY((SELECT Id
													,[Name]
											FROM dbo.LocationTypes		
											WHERE Id = l.LocationTypeId
											FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS [LocationType]
								,cl.LineOne
								,cl.LineTwo
								,cl.City
								,cl.Zip
								,JSON_QUERY((SELECT Id
													,[Name]
											FROM dbo.States		
											WHERE Id = cl.StateId
											FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS [State]
								,cl.Latitude
								,cl.Longitude
								,cl.DateCreated
								,cl.DateModified
								,cl.CreatedBy
								,cl.ModifiedBy
						FROM dbo.Locations as cl
						inner join dbo.LocationTypes as clt 
						on l.LocationTypeId = clt.Id		
						WHERE c.LocationId = cl.Id
						FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS [location]					
					,c.DateCreated
					,c.DateModified
					,c.CreatedBy
					,c.ModifiedBy
				FROM dbo.Clients as c
				left outer join dbo.ClientAttorney as ca
					on ca.AttorneyId = ap.Id
				inner join dbo.GenderTypes as gt 
					on c.GenderTypeId = gt.Id											  
				WHERE c.Id = ca.ClientId
				FOR JSON PATH
				)
	FROM dbo.AttorneyProfiles as ap 		
		inner join dbo.Locations as l
			on ap.LocationId = l.Id
		inner join dbo.LocationTypes as lt 
			on l.LocationTypeId = lt.Id
		inner join dbo.States as s
			on l.StateId = s.Id
	WHERE ap.IsActive = 1
	ORDER BY ap.Id

END
GO
