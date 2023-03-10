CREATE proc [dbo].[Advertisements_SelectByIdV2]
		@Id int

/*****************Test Code*********************
Declare @Id int = 8

Execute [dbo].[Advertisements_SelectByIdV2]
		@Id


		select *
		from advertisements

***********************************************/
As

Begin

SELECT		adv.Id
			,adv.AttorneyProfileId
			,adv.AdTierId
			,ap.Id
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
						  SELECT la.Id, la.Code, la.Name
						  FROM dbo.AttorneyLanguages as al 
							   inner join dbo.Languages as la
								  on al.LanguageId = la.Id
						  WHERE al.AttorneyProfileId = ap.Id
						  FOR JSON AUTO
							)
			,ap.DateCreated
			,ap.DateModified
			,adv.Title
			,adv.AdMainImage
			,adv.Details
			,adv.DateCreated
			,adv.DateModified
			,adv.DateStart
			,adv.DateEnd
  FROM [dbo].[Advertisements] as adv inner join [dbo].[AttorneyProfiles] as ap
		ON adv.AttorneyProfileId = ap.Id
	inner join [dbo].[Locations] as l
		ON ap.LocationId = l.Id
	inner join [dbo].[LocationTypes] as lt
		ON l.LocationTypeId = lt.Id
	inner join [dbo].[States] as s
		ON l.StateId = s.Id
	Where adv.Id = @Id

End


GO
