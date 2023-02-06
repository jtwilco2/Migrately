CREATE PROC [dbo].[Advertisements_Select_ByTierId]
			@AdTierId int

AS

/*****************Test Code*********************
Declare @AdTierId int = 1

Execute [dbo].[Advertisements_Select_ByTierId]
		@AdTierId

***********************************************/

BEGIN

	SELECT	adv.Id
			,adv.AdTierId
			,adv.OwnerId
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
		ON adv.OwnerId = ap.CreatedBy
	inner join [dbo].[Locations] as l
		ON ap.LocationId = l.Id
	inner join [dbo].[LocationTypes] as lt
		ON l.LocationTypeId = lt.Id
	inner join [dbo].[States] as s
		ON l.StateId = s.Id
	inner join [dbo].[AttorneyLanguages] as al
		ON al.AttorneyProfileId = ap.Id
	inner join [dbo].[Languages] as la
		ON la.Id = al.LanguageId
  WHERE adv.AdTierId = @AdTierId

END


GO
