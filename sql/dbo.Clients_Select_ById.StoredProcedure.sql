CREATE proc [dbo].[Clients_Select_ById]
				@Id int

AS

/*----- TEST CODE -----

	DECLARE @Id int = '2'
	EXECUTE dbo.Clients_Select_ById @Id

*/

BEGIN
	
	SELECT c.Id
		   ,c.Email
		   ,c.FirstName
		   ,c.LastName
		   ,c.Mi
		   ,gt.Id
		   ,gt.Name
		   ,c.Landline
		   ,c.Mobile
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
		   ,c.DateCreated
		   ,c.DateModified
		   ,c.CreatedBy
		   ,c.ModifiedBy
	FROM dbo.Clients as c inner join dbo.GenderTypes as gt
				on c.GenderTypeId = gt.Id
			inner join dbo.Locations as l
				on c.LocationId = l.Id
			inner join dbo.States as s
				on l.StateId = s.Id
			inner join dbo.LocationTypes as lt 
				on l.LocationTypeId = lt.Id		
	WHERE c.Id = @Id

END
GO
